import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import Editable from "./components/Editable/Editable";

function App() {
  const [boards, setBoards] = useState([
    // {
    //   id: Date.now() + Math.random() * 2,
    //   title: "To do",
    //   cards: [
    //     {
    //       id: Date.now() + Math.random() * 2,
    //       title: "Card 1",
    //       tasks: [],
    //       labels: [
    //         {
    //           text: "Frontend",
    //           color: "blue",
    //         },
    //       ],
    //       desc: "bsodfjaeih hdfklj",
    //       date: "",
    //     },
    //     {
    //       id: Date.now() + Math.random() * 2,
    //       title: "Card 1",
    //       tasks: [],
    //       labels: [
    //         {
    //           text: "Backend",
    //           color: "red",
    //         },
    //       ],
    //       desc: "bsodfjaeih hdfklj",
    //       date: "",
    //     },
    //   ],
    // },
  ]);

  //Also let's make a state for targetcard so that we can have an idea that which is target card
  const [target, setTarget] = useState({
    cid: "",
    bid: "",
  });
  //now we will make a function inside app.js which will handle the addition of add card
  //alsso  here cards we made which we will push to board ,, but board should also be specified b4 pushing the card into it which will tell
  //to which board we want to add the card... so to make it clear we will take board id i.e. bid as parameter inside this addcard fnctn
  const addCard = (title, bid) => {
    const cards = {
      id: Date.now() + Math.random(),
      title,
      labels: [],
      tasks: [],
      date: "",
      desc: "",
    };

    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push(cards);
    setBoards(tempBoards);
  };

  const removeCard = (cid, bid) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
    if (cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards.splice(cIndex, 1);
    setBoards(tempBoards);
  };

  const addBoard = (title) => {
    setBoards([
      ...boards,
      {
        id: Date.now() + Math.random(),
        title,
        cards: [],
      },
    ]);
  };
  const removeBoard = (bid) => {
    const tempBoards = boards.filter((item) => item.id !== bid);
    //yha jo jo items ka bid k equal nhi h,  to elements tempboard m aajaenge i.e. except bid board we will have all the boards
    //agar hme kisi array m s chuninda result chahie to hm filter ka use kar skte h, wrna in case if hme array m s results utne hi chhie but
    //har element m kuchh changes krne h, to hm map ka use kar skte h
    setBoards(tempBoards);
  };

  //We should do all the managable things in the App.js only bcoz hfer we have the board array and its good if we do all the modification here
  const handleDragEnd = (cid, bid) => {
    //Here the parameters cid, bid are of the source card i.e. the card whose drag has ended now,,
    //s_bIndex = index of source board, s_cIndex  = index of source card, t_bIndex = index of target board, t_cIndex = index of target card
    let s_bIndex, s_cIndex, t_cIndex, t_bIndex;

    s_bIndex = boards.findIndex((item) => item.id === bid);
    if (s_bIndex < 0) return;

    //(here s_bIndex < 0 means that source has no board so we just returned it)

    s_cIndex = boards[s_bIndex].cards?.findIndex((item) => item.id === cid);
    if (s_cIndex < 0) return;
    //here bid and cid are of source which are sent by  source to us whenever dragend is happening
    //but target card ki board id we are storing separately by making a state
    t_bIndex = boards.findIndex((item) => item.id === target.bid);
    if (s_bIndex < 0) return;

    t_cIndex = boards[t_bIndex].cards?.findIndex(
      (item) => item.id === target.cid
    );
    if (t_cIndex < 0) return;
    //now we have all details of source as well of target

    const tempboards = [...boards];
    //copying the board
    const tempCard = tempboards[s_bIndex].cards[s_cIndex];
    //here copying the source card which has to be pasted

    tempboards[s_bIndex].cards.splice(s_cIndex, 1);
    //here we removed the source card from source board
    tempboards[t_bIndex].cards.splice(t_cIndex, 0, tempCard);
    //here we are removing 0 items as the second argument passed to it and third argument is to add something and we want to add tempCard which we earlier copied

    setBoards(tempboards);
  };

  const handleDragEnter = (cid, bid) => {
    //jab bhi kisi m enter hoga to uspe target set ho jaega
    setTarget({
      cid,
      bid,
    });
  };

  const updateCard = (cid, bid, card) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
    if (cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards[cIndex] = card;
    setBoards(tempBoards);
  };
  return (
    <div className="app">
      <div className="app_navbar">
        <h2>Kanban</h2>
      </div>
      <div className="app_outer">
        <div className="app_boards">
          {boards.map((item) => (
            <Board
              key={item.id}
              board={item}
              removeBoard={removeBoard}
              addCard={addCard}
              removeCard={removeCard}
              handleDragEnd={handleDragEnd}
              handleDragEnter={handleDragEnter}
              updateCard={updateCard}
            />
          ))}

          <div className="app_boards_board">
            <Editable
              displayClass="app_boards_board_add"
              // text="Add Board"
              placeholder="Enter board title"
              onSubmit={(value) => addBoard(value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
