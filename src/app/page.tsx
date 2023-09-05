import Calendar from "./calendar"


function firstBeforeSecond(first: Date, second: Date) : boolean{
  const firstTime = new Date(first.toLocaleDateString()).getTime()
  const secondTime = new Date(second.toLocaleDateString()).getTime()
  return firstTime <= secondTime
}

function getDeadlinesForDays(deadlines: Deadline[], startDate: Date, weeks: number){
  const deadlinesOrdered: (Deadline|undefined)[][] = []
  for (let i = 0; i < weeks*12; i++){
    const dateOfDay = new Date(startDate.getTime() + 24*60*60*1000 * i)
    const day: (Deadline|undefined)[] = []
    for (let x of deadlines){
      //should be shown today
      if (firstBeforeSecond(dateOfDay, new Date(x.due)) && firstBeforeSecond(new Date(x.start || x.due), dateOfDay)){
        if (i == 0){
          day.push(x);
        }else{
          const yesterdayPos = deadlinesOrdered[i-1].indexOf(x)
          if (yesterdayPos > -1){
            day.splice(yesterdayPos, 0, x);
          }else{
            day.push(x)
            // add at next open pos
            
          }
        }

      }

    }
    // console.log(deadlinesOrdered)
    deadlinesOrdered.push(day)
  }
  return deadlinesOrdered

}

export default async function Home() {
  const startDate = new Date(2023, 7, 28)
  const semesterStart = new Date(2023, 8, 11)
  const weeks = 17

  // 
  // console.log(deadlines)
  const deadlines = await fetch(`${process.env.LOCAL_ADDRESS}/api/deadlines`, {next:{tags: ['deadlines'], revalidate: 15000}})
  const stuff: DBResponse = (await deadlines.json())
  const {fields, rows} = stuff
  const deadlinesForDays = getDeadlinesForDays(rows, startDate, weeks)


  return (
    <main className="flex flex-col items-center">
      <h1 className="py-6 text-4xl dark:text-white">Deadline o matic</h1>
      <Calendar startDate={startDate} semesterStart={semesterStart} weeks={weeks} deadlines={deadlinesForDays}/> 
    </main>
  )
}