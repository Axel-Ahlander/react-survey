import { useState } from "react";
import AnswersItem from "./AnswersItem";
import AnswersList from "./AnswersList";

function Survey() {
  const [open, setOpen] = useState(false); //Ignore this state

  const init = {
    username: "",
    color: 0,
    timeSpent: [],
    review: "",
    email: ""
  }

  const [answer, setAnswer] = useState({
    username: "A",
    color: 1,
    timeSpent: ["C"],
    review: "D",
    email: "a@a.com"
  });

  const [answersList, setAnswersList ]= useState(
    [
      {
        id: 1,
        username : "A",
        color: 1,
        timeSpent: [],
        review : "A",
        email: "aa@g.com"
      }
    ]
  );

  const [currentEditId, setCurrentEditId] = useState(null);

  const [currData, setCurrData] = useState(init);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setCurrData((prevData) => {
        const newTimeSpent = checked ? [...prevData.timeSpent, value] : prevData.timeSpent.filter((item) => item !== value);

        return {
          ...prevData, timeSpent: newTimeSpent,
        };
      });
    } else {
      setCurrData((prevData) => ({
        ...prevData, [name]: value,
      }));
    }
  };

 const handleEdit = (id) => {
    console.log(id);  
  const itemEdit = answersList.find((item) => item.id === id);
  if (itemEdit) {
    setCurrData(itemEdit);
    setCurrentEditId(id);
  }
 }


  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentEditId){
      setAnswersList((prevList) => {
        return prevList.map((item) => item.id == currentEditId ? {...currData, id:currentEditId} : item)
      });
      setCurrentEditId(null);
    }

    else {
      setAnswer({
        username: currData.username,
        color: currData.color,
        timeSpent: currData.timeSpent,
        review: currData.review,
        email: currData.email
      });
  
      setAnswersList([...answersList, {
        id: Math.max(...answersList.map((answe) => answe.id)) + 1,
        username: currData.username,
        color: currData.color,
        timeSpent: currData.timeSpent,
        review: currData.review,
        email: currData.email
      }])
    }

    

    setCurrData(init);
    console.log("now comes current");
    console.log(currData);
  }

  
    return (
      <>
      <main className="survey">
        <section className={`survey__list ${open ? "open" : ""}`}>
          <h2>Answers list</h2>
          <AnswersList answersList = {answersList} onClick = {handleEdit} />
        </section>
        <section className="survey__form">
          
        <form className="form" onSubmit={handleSubmit}>
    <h2>Tell us what you think about your rubber duck!</h2>
    <div className="form__group radio">
      <h3>How do you rate your rubber duck colour?</h3>
      <ul>
    <li>
      <input id="color-one" type="radio" name="color" value={1} onChange = {handleChange}  checked = {currData.color == 1}/><label
        htmlFor="color-one"
        >1</label
      >
    </li>
    <li>
      <input id="color-two" type="radio" name="color" value={2} onChange={handleChange} checked = {currData.color == 2}/><label
        htmlFor="color-two"
        >2</label
      >
    </li>
    <li>
      <input id="color-three" type="radio" name="color" value={3} onChange={handleChange}  checked = {currData.color == 3}/><label
        htmlFor="color-three"
        >3</label
      >
    </li>
    <li>
      <input id="color-four" type="radio" name="color" value={4} onChange={handleChange} checked = {currData.color == 4}/><label
        htmlFor="color-four"
        >4</label
      >
    </li>
  </ul>
  
    </div>
    <div className="form__group">
      <h3>How do you like to spend time with your rubber duck</h3>
      <ul>
    <li>
      <label
        ><input
          name="timeSpent"
          type="checkbox"
          value="swimming"
          onChange={handleChange}
          checked={currData.timeSpent.includes("swimming")}
        />Swimming</label
      >
    </li>
    <li>
      <label
        ><input name="timeSpent" type="checkbox" value="bathing" onChange={handleChange} checked = {currData.timeSpent.includes("bathing")}/>Bathing</label
      >
    </li>
    <li>
      <label
        ><input
          name="timeSpent"
          type="checkbox"
          value="chatting"
          onChange={handleChange}
          checked={currData.timeSpent.includes("chatting")}
        />Chatting</label
      >
    </li>
    <li>
      <label
        ><input name="timeSpent" type="checkbox" value="noTime" onChange={handleChange} checked = {currData.timeSpent.includes("noTime")}/>I don't like to
        spend time with it</label
      >
    </li>
  </ul>
  
    </div>
    <label
      >What else have you got to say about your rubber duck?<textarea
        name="review"
        cols="30"
        rows="10"
        onChange={handleChange}
        value={currData.review}
      ></textarea></label
    ><label
      >Put your name here (if you feel like it):<input
        type="text"
        name="username"
        value={currData.username}
        onChange={handleChange}
         /></label
    ><label
      >Leave us your email pretty please??<input
        type="email"
        name="email"
        value={currData.email} 
        onChange={handleChange}
        /></label
    >
    <input className="form__submit" type="submit" value="Submit Survey!" />
  </form>
  
        </section>
      </main>
      </>
      
);
}

export default Survey;
