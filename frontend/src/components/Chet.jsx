import { useState } from 'react'
import {ask} from '../utils/AuthService'

const Chet = ()=>{
const [question,setQuestion] = useState('')
const [allQnA,setAllQnA] = useState([])
const handleAsk = ()=>{
    ask(question).then((res) => setAllQnA([...allQnA,res.data]))
}

return(
    <>
    <div>
        <div>
            {allQnA.map((v,i)=><div key={i}>
            <p>{`Question: ${v.question}`}</p>
            <p>{`Answer: ${v.answer}`}</p>
            </div>
            )}
        </div>
        <input type="text" onChange={((e)=>setQuestion({question: e.target.value, answer: ''}))}/>
        <button onClick={handleAsk}>send</button>

        
        <button onClick={()=>console.log(allQnA)}>log</button>
    </div>
    </>
)
}
export default Chet