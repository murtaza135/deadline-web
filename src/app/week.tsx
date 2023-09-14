"use client"
import { Deadline } from "@prisma/client"

import DateIco from "./date"

function sameDay(first: Date, second: Date): boolean{
  const firstTime = first.toLocaleDateString()
  const secondTime = second.toLocaleDateString()
  return firstTime == secondTime
}

export default function Week({startOfWeek, deadlines, modal}: {startOfWeek: Date, deadlines: (Deadline|null)[][], modal: CallableFunction}){
  // console.log(deadlines)
  const rows = []
  for (let i = 0; i < 7; i++){
    const dateOfDay: Date = new Date(startOfWeek.getTime() + 24*60*60*1000 * i)
    // console.log(deadlines)
    rows.push(
      <div key={i} className="w-full h-28 border cursor-pointer dark:border-slate-700 " onClick={()=>{modal({date: dateOfDay, deadlines: deadlines[i]})}}>   
              {/* dates */}
              <DateIco date={dateOfDay} showDay={true}/>

              {/* deadlines */}
              {deadlines[i].map((x: Deadline|null, j: number)=>(
                <span key={j}>{x && <div className={`hover:h-auto overflow-y-hidden h-6 mb-1 text-center 
                                        ${(sameDay(dateOfDay, new Date(x.due))) && "rounded-r-4xl w-5/6"} 
                                        ${(sameDay(dateOfDay, new Date(x.start || x.due))) && "rounded-l-4xl ml-2"}`} style={{backgroundColor:"lch(73% 41 " + x.color + ")"}}>
                  {(i==0 || sameDay(dateOfDay, new Date(x.due)) || sameDay(dateOfDay, new Date(x.start|| x.due))) && x.name} &#8203;
                </div>}
                {(x==null) && <div className="h-6 mb-1">&#8203;</div>}</span>
              ))}
                        
          </div>
      )
    

  }
  return <div className="week flex pb-4">
      {rows} 
    </div>
}