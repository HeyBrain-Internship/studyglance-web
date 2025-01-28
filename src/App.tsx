import React, { useRef, useState } from "react";
import "./App.css";

function MainPage()
{
    type Data = [number, string, string, string, string, string, string, string, string, string, number][];

    const [isStartPage, setIsStartPage]       = useState<boolean>(true);
    const [selectedItem, setSelectedItem]     = useState("");
    const [data, setData]                     = useState<Data>([]);
    const [questionNumber, setQuestionNumber] = useState(0);
    const items                               = ["Grade Kindergarten",
                                                 "Grade 1",
                                                 "Grade 2",
                                                 "Grade 3",
                                                 "Grade 4",
                                                 "Grade 5",
                                                 "Grade 6",
                                                 "Grade 7",
                                                 "Grade 8"];
    const [title, setTitle]                   = useState<string>("");
    const [question, setQuestion]             = useState<string>("");
    const [answer_1, setAnswer_1]             = useState<string>("");
    const [answer_2, setAnswer_2]             = useState<string>("");
    const [answer_3, setAnswer_3]             = useState<string>("");
    const [answer_4, setAnswer_4]             = useState<string>("");
    const [answerRight, setAnswerRight]       = useState<number>(0);
    const [result, setResult]                 = useState<{ message : string, color : string }>({
                                                                                                   message : "",
                                                                                                   color :   ""
                                                                                               });
    const buttonAnswer_1                      = useRef<HTMLButtonElement>(null);
    const buttonAnswer_2                      = useRef<HTMLButtonElement>(null);
    const buttonAnswer_3                      = useRef<HTMLButtonElement>(null);
    const buttonAnswer_4                      = useRef<HTMLButtonElement>(null);

    const handleChange = (event : React.ChangeEvent<HTMLSelectElement>) =>
    {
        setSelectedItem(event.target.value);
    }

    const buttonStartClick = async () =>
    {
        setResult({ message : "", color : "" });

        let grade : string;
        //@formatter:off
        switch (selectedItem)
        {
            case "Kindergarten": grade = "grade-kindergarten"; break;
            case "Grade 1": grade = "grade-1"; break;
            case "Grade 2": grade = "grade-2"; break;
            case "Grade 3": grade = "grade-3"; break;
            case "Grade 4": grade = "grade-4"; break;
            case "Grade 5": grade = "grade-5"; break;
            case "Grade 6": grade = "grade-6"; break;
            case "Grade 7": grade = "grade-7"; break;
            case "Grade 8": grade = "grade-8"; break;
            default: grade = "grade-kindergarten"; break;
        }
        //@formatter:on

        try
        {
            const response     = await fetch("https://studyglance.space/api/get-" + grade);
            const dataImported = await response.json();
            const newData      = dataImported["receivedData"];

            setData(newData);
            setTitle(`${newData[0][2]} / ${newData[0][3]} / ${newData[0][4]}`);
            setQuestion(`${newData[0][5]}`);
            setAnswer_1(`${newData[0][6]}`);
            setAnswer_2(`${newData[0][7]}`);
            setAnswer_3(`${newData[0][8]}`);
            setAnswer_4(`${newData[0][9]}`);
            setAnswerRight(Number(newData[0][10]));
        }
        catch (error)
        {
            console.log(error);
        }

        setIsStartPage(false);
    }

    const buttonAnswerClick = (selectedAnswer : number) =>
    {
        if (selectedAnswer === answerRight)
        {
            setResult({ message : "Right!", color : "lightgreen" });
            setTimeout(() => nextQuestion(), 2000);
        }
        else
        {
            //@formatter:off
            switch (answerRight)
            {
                case 1: setResult({ message : `Wrong! Right answer is: ${answer_1}`, color : "red" }); break;
                case 2: setResult({ message : `Wrong! Right answer is: ${answer_2}`, color : "red" }); break;
                case 3: setResult({ message : `Wrong! Right answer is: ${answer_3}`, color : "red" }); break;
                case 4: setResult({ message : `Wrong! Right answer is: ${answer_4}`, color : "red" }); break;
            }
            //@formatter:on
            setTimeout(() => nextQuestion(), 3000);
        }

    }

    const nextQuestion = () =>
    {
        if (questionNumber < data.length - 1)
        {
            if (buttonAnswer_1.current || buttonAnswer_2.current || buttonAnswer_3.current || buttonAnswer_4.current)
            {
                buttonAnswer_1.current?.blur();
                buttonAnswer_2.current?.blur();
                buttonAnswer_3.current?.blur();
                buttonAnswer_4.current?.blur();
            }

            const nextQuestionNumber = questionNumber + 1;
            setQuestionNumber(nextQuestionNumber);

            const nextData = data[nextQuestionNumber];
            setTitle(`${nextData[2]} / ${nextData[3]} / ${nextData[4]}`);
            setQuestion(nextData[5]);
            setAnswer_1(nextData[6]);
            setAnswer_2(nextData[7]);
            setAnswer_3(nextData[8]);
            setAnswer_4(nextData[9]);
            setAnswerRight(Number(nextData[10]));

            setResult({ message : "", color : "" });
        }
    }

    return (
        <div>
            <div style={{ display : isStartPage ? "block" : "none" }}>
                <label htmlFor="dynamic_dropdown">
                    <h2>Select grade:</h2>
                </label>
                <select
                    id="dynamic_dropdown"
                    value={selectedItem}
                    onChange={handleChange}
                    className="dynamic-dropdown"
                >
                    <option value="" disabled>
                        Select a grade
                    </option>
                    {items.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                <br/>
                <br/>
                <button onClick={buttonStartClick}>Start</button>
            </div>
            <div style={{ display : isStartPage ? "none" : "block" }}>
                <p>
                    <h1 style={{ color : "pink" }}>Let's study!</h1>
                    <i>{title}</i>
                    <h3 style={{ color : "yellow" }}>{question}</h3>
                </p>
                <div style={{ color : result.color }}>
                    <h3>{result.message || " "}</h3>
                </div>
                <div>
                    <button ref={buttonAnswer_1}
                            className="button-answer"
                            onClick={() => buttonAnswerClick(1)}>{answer_1}</button>
                    <button ref={buttonAnswer_2}
                            className="button-answer"
                            onClick={() => buttonAnswerClick(2)}>{answer_2}</button>
                </div>
                <div>
                    <button ref={buttonAnswer_3}
                            className="button-answer"
                            onClick={() => buttonAnswerClick(3)}>{answer_3}</button>
                    <button ref={buttonAnswer_4}
                            className="button-answer"
                            onClick={() => buttonAnswerClick(4)}>{answer_4}</button>
                </div>
                <button onClick={() => setIsStartPage(true)}>Back to start menu</button>
            </div>
        </div>
    );
}

export default MainPage;
