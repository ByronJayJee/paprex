// src/components/task_answers.js

import React from 'react'


const TaskHighlightAnswer = ({ task_result }) => {
  const full_context = task_result.context
  const pre_answer = full_context.substring(0,task_result.start_index)
  const answer = full_context.substring(task_result.start_index,task_result.end_index)
  const post_answer = full_context.substring(task_result.end_index)
  console.log(pre_answer)
  console.log(answer)
  console.log(post_answer)
  return (
    <div class="single_answer">{pre_answer}<span class='answer'>{answer}</span>{post_answer}</div>
  )
};

const TaskPrintResults = ({ result }) => {
  const start_idx = result.start_index
  const end_idx = result.end_index
  const context_len = result.context.length
  const whole_context = (start_idx == 0) && (context_len == end_idx)
  const no_context = (start_idx == 0) && (end_idx == 0)

  if (whole_context || no_context){
    return('')
  }
  return (
    <>
      {
      [<h3 class='single_answer'>{result.title}</h3>,
      <h3 class='single_answer'>[Article PMID: {result.pmid}]</h3>,
      <h3 class='single_answer'>[Answer: {result.answer}]</h3>,
      <TaskHighlightAnswer task_result={result} />]
      }
    </>
  )
};

const TaskResults = ({ task_results }) => {
	/*
        [<h3 class='single_answer'>{result.title}</h3>,
        <h3 class='single_answer'>[Article PMID: {result.pmid}]</h3>,
        <h3 class='single_answer'>[Answer: {result.answer}]</h3>,
        <TaskHighlightAnswer task_result={result} />]
	*/
  return (
    <>
      {task_results.map((result) => (
	<TaskPrintResults result={result} />
      ))}
    </>
  )
};

const TaskQuestions = ({ task_questions }) => {
  return (
    <>
      {task_questions.map((question) => (
        [<h2 class='question_title'>{question.question}</h2>,
	    <TaskResults task_results={question.results} />]
      ))}
    </>
  )
};

const TaskAnswers = ({ task_answers }) => {
	console.log(task_answers);
  return (
    <>
      <center><h1>Task Answers</h1></center>
      {task_answers.map((tasks) => (
        [<div class="card">
          <div class="card-body">
            <h1 class='task_title' >{tasks.task}</h1>
	    <TaskQuestions task_questions={tasks.questions} />
          </div>
        </div>]
      ))}
    </>
  )
};

export default TaskAnswers
