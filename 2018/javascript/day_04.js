const fs = require("fs")
const path = require("path")

function main() {
  const input = fs.readFileSync(path.resolve(__dirname, "./../inputs/day_04.txt"), "utf8")
  console.log(star_01(input))
}

function star_01(input) {
  let logs = lines(input).map(parse_line)
  logs = sort_by_date(logs)
  const guard_sleep_times = find_guard_sleep_times(logs)

  let most_asleep
  for (const [guard_id, minutes] of Object.entries(guard_sleep_times)) {
    const duration = [...Object.values(minutes)].reduce((acc, a) => acc + a)
    if (!most_asleep || duration > most_asleep.duration) {
      console.log(guard_id)
      most_asleep = {guard_id, duration, minutes}
    }
  }
  const minute = Object.entries(most_asleep.minutes).sort((a, b) => {
    return b[1] - a[1]
  })[0][0]
  // console.log({most_asleep, minute})
  return most_asleep.guard_id * minute
}

function lines(str) {
  return str.split("\n").filter(s => s.length)
}

function parse_line(line) {
  const [, date, time, action] = line.match(/\[(\d+-\d+-\d+)\s(\d+:\d+)\]\s(.*)/)
  return {date, time, timestamp: date + " " + time, action}
}

function sort_by_date(logs) {
  return logs.sort((a, b) => {
    return a.timestamp > b.timestamp ? 1 : a.timestamp < b.timestamp ? -1 : 0
  })
}

function find_guard_sleep_times(logs) {
  let guard_map = {}
  let i = 0
  let guard_id
  while (i < logs.length) {
    const next_guard_id = parse_guard_id(logs[i])
    if (next_guard_id) {
      guard_id = next_guard_id
    }
    const sleepEvent = logs[++i]
    if (!sleepEvent || !sleepEvent.action.includes("sleep")) {
      continue
    }
    const wakeEvent = logs[++i]

    if (!(guard_id in guard_map)) {
      guard_map[guard_id] = {}
    }
    let guard = guard_map[guard_id]
    let time = Number.parseInt(sleepEvent.time.split(":")[1])
    let end_time = Number.parseInt(wakeEvent.time.split(":")[1])
    while (time < end_time) {
      guard[time] = (guard[time] || 0) + 1
      time++
    }
  }
  return guard_map
}

function sleep_duration(start_time, end_time) {
  return Number.parseInt(end_time.split(":")[1]) - Number.parseInt(start_time.split(":")[1])
}


function parse_guard_id(log) {
  const [, guard_id] = log.action.match(/#(\d+)/) || []
  return guard_id && Number.parseInt(guard_id)
}

main()
