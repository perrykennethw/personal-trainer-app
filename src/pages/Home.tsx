import RadioListGroup from "../components/RadioListGroup";
import CheckBoxGroup from "../components/CheckBoxGroup";
import SubmitButton from "../components/SubmitButton";
import { useState } from "react";

function Home() {
    const [selected, setSelected] = useState<string[]>([]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
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
                />
                <br />
                <h3>What are your lagging muscles that you would like to improve?</h3>
                <CheckBoxGroup
                    label="muscles"
                    selected={selected}
                    options={[
                        { label: "Chest", value: "chest" },
                        { label: "Back", value: "back" },
                        { label: "Shoulders", value: "shoulders" },
                        { label: "Arms", value: "arms" },
                        { label: "Legs", value: "legs" },
                        { label: "Abs", value: "abs" },
                    ]}
                    onChange={() => {setSelected}}
                />
                <br />
                <SubmitButton className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" value="Get Results!" />
            </form>
        </>
    );
}

export default Home;