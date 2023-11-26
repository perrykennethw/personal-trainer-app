import RadioListGroup from "../components/RadioListGroup";
import CheckBoxGroup from "../components/CheckBoxGroup";
import SubmitButton from "../components/SubmitButton";
import { useState } from "react";
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

interface parameters {
    days: string;
    goal: string;
    areaOfFocus: string;
    experience: string;
}

interface data {
    client_profile: string;
    workout_plan: string;
}

function Home() {
    const [muscles, setSelected] = useState<string[]>([]);
    const [goal, setGoal] = useState<string>('');
    const [daysOfWeek, setDaysOfWeek] = useState<string>('');
    const [experience, setExperience] = useState<string>('');
    const [data, setData] = useState<data>({client_profile: '', workout_plan: ''});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGoal(event.target.value);
    }

    const handleExperienceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExperience(event.target.value);
    }

    const handleDaysOfWeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDaysOfWeek(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetchData({ days: daysOfWeek, goal: goal, areaOfFocus: muscles.join(', '), experience: experience });
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelected([...muscles, event.target.value]);
        } else {
            setSelected(muscles.filter((muscle) => muscle !== event.target.value));
        }
    }

    async function fetchData(parameters: parameters) {
        setLoading(true);
        try {
            const data = await openai.chat.completions.create({
                model: "gpt-4-1106-preview",
                messages: [
                    {
                        role: "user",
                        content: `"prompt": "Imagine you are a Personal Fitness Trainer. Your client wants a specialized workout plan. They have ${parameters?.days} days per week to exercise. Their fitness goal is to ${parameters?.goal}, and they have identified ${parameters?.areaOfFocus} as their areas of focus. They have ${parameters?.experience} Design a workout plan for them that will help them achieve their goals. I need this response in json.`
                    },
                ],
                temperature: 1,
                max_tokens: 4095,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                response_format: { type: "json_object" },
            });
            if (data.choices[0]?.message?.content) {
                setData(JSON.parse(data.choices[0].message.content));
            }
            return;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1 className="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight pb-10">Tired Of Spending Money on Personal Trainer?</h1>
            <h2 className="text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight">I am here to help you start a personalized workout program</h2>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded mt-4 px-8 pt-6 pb-8 mb-4">
                <h3>What is your goal?</h3>
                <RadioListGroup
                    name="goal"
                    options={[
                        { label: "Lose Weight", value: "lose-weight" },
                        { label: "Gain Muscle", value: "gain-muscle" },
                        { label: "Maintain Weight", value: "maintain-weight" },
                    ]}
                    onChange={handleGoalChange}
                />
                <br />
                <h3>How many days a week would you be able to go to the gym?</h3>
                <RadioListGroup
                    name="days"
                    options={[
                        { label: "1-2", value: "1-2" },
                        { label: "3-4", value: "3-4" },
                        { label: "5-6", value: "5-6" },
                        { label: "7", value: "7" },
                    ]}
                    onChange={handleDaysOfWeekChange}
                />
                <br />
                <h3>How long have you been working out?</h3>
                <RadioListGroup
                    name="experience"
                    options={[
                        { label: "0-6 months", value: "0-6" },
                        { label: "6-12 months", value: "6-12" },
                        { label: "1-2 years", value: "1-2" },
                        { label: "2+ years", value: "2+" },
                    ]}
                    onChange={handleExperienceChange}
                />
                <br />
                <h3>What are your lagging muscles that you would like to improve?</h3>
                <CheckBoxGroup
                    label="muscles"
                    selected={muscles}
                    options={[
                        { label: "Chest", value: "chest" },
                        { label: "Back", value: "back" },
                        { label: "Shoulders", value: "shoulders" },
                        { label: "Arms", value: "arms" },
                        { label: "Legs", value: "legs" },
                        { label: "Abs", value: "abs" },
                    ]}
                    onChange={handleCheckboxChange}
                />
                <br />
                <SubmitButton className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" value="Get Results!" />
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>There was an error loading your data!</p>}
            {data && (
                <div className="bg-white shadow-md rounded mt-4 px-8 pt-6 pb-8 mb-4">
                    <h3>Here is your profile:</h3>
                    <p>{data?.client_profile}</p>
                    <h3>Here is your workout plan!</h3>
                    <p>{data?.workout_plan}</p>
                </div>
            )}
        </>
    );
}

export default Home;