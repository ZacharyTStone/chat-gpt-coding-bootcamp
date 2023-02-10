"use client"
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { useState } from 'react'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [question, setQuestion] = useState('')

  const [answer, setAnswer] = useState('')

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')
  const bootcampTypes = [
    {
      label : 'Web Dev React Bootcamp',
      value :[
        'HTML',
        'CSS',
        'JavaScript',
        'React',
        'Node.js',
        'MongoDB',
        'Express',
  
      ]
    },
    {
      label : 'Web Dev Python Bootcamp',
      value :[
        'HTML',
        'CSS',
        'JavaScript',
        'Python',
        'Django',
        'PostgreSQL',
        'Express',
  
      ]
    },
    {
      label : 'Web Dev Java Bootcamp',
      value :[
        'HTML',
        'CSS',
        'JavaScript',
        'Java',
        'Spring',
        'PostgreSQL',
        'Express',
  
  
      ]
    },
    {
      label : 'Web Dev C# Bootcamp',
      value :[
        'HTML',
        'CSS',
        'JavaScript',
        'C#',
        'ASP.NET',
        'PostgreSQL',
        'Express',
  
      ]
    },
    {
      label : 'Web Dev Ruby Bootcamp', 
      value :[
        'HTML',
        'CSS',
        'JavaScript',
        'Ruby',
        'Ruby on Rails',
        'PostgreSQL',
        'Express',
          
      ] 
    }
  ];

  const [selectedTechnologies, setSelectedTechnologies] = useState(
    bootcampTypes[0].value
  ) as any;

  const [selectedAnswerType, setSelectedAnswerType] = useState("") as any;




  
  

const handleSubmit = async () => {

   const prompt = buildPrompt({
    question,
    selectedTechnologies,
    answerType: selectedAnswerType,
   })

   const response = await fetch("/api/generate_response", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  })

  const { data } = await response.json()

  setAnswer(data)

} ;

const answerTypes = [
  "non technical",
  "technical",
  "factual",
] ;

const initial_prompt = "you are a coding bootcamp instrutor. "

const buildPrompt = ({
  question,
  selectedTechnologies,
  answerType,
} : 
{
  question: string,
  selectedTechnologies: string[],
  answerType: string,
}
) => {

  let prompt = initial_prompt

   prompt += "You are teaching a class on " + selectedTechnologies.map((technology) => technology).join(', ') + ". "

   switch (answerType) {
    case "non technical":
      prompt += "Your students ask you " + question + ". " + "provide them a real world non technical example to help them understand that."

      break;
    case "technical":
      prompt += "Your students ask you " + question + ". " + "provide them a technical example to help them understand that. try to limit the technical example to the technologies you are teaching."

      break;

    case "factual":
      prompt += "Your students ask you " + question + ". " + "provide them a factual and objective answer to help them understand that better."

      break;

    default:
      break;
  }

  return prompt
}


  return (
    <main className={styles.main}>
       <h1>
         Welcome to Chat GPT's BrainStorm Acadamy Coding Bootcamp
       </h1>

       <select 
        
        onChange = {e => setSelectedTechnologies(e.target.value )}
        value = {
          selectedTechnologies
        }
        >
          {bootcampTypes.map((bootcampType) => (
            <option key={bootcampType.label} value={bootcampType.value}>
              {bootcampType.label}
            </option>
          ))}
        </select>

        

        <h2>Ask a question</h2>

        <input type="text" value={question} onChange={e => setQuestion(e.target.value)} />

        <button onClick = {() => handleSubmit()}>Submit</button>

        <p>{answer}</p>

        
        {
          error && <p>{error}</p>
        }
       


    </main>
  )
}
