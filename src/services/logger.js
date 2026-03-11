import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

// ESM-safe __dirname equivalent
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// logger
export const Logger = (req, res, next) => {
    const date = new Date()
    const time = date.toLocaleDateString() + " -- " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    const log = `${time} --  ${req.method} -- ${req.originalUrl}  ${res.statusCode} `
    console.log(log)

    const logDir = path.join(__dirname, "../../", "logs")
    const logFile = path.join(logDir, "log.txt")

    // Create logs directory if it doesn't exist
    fs.mkdirSync(logDir, { recursive: true })

    fs.appendFile(logFile, log + "\n", err => {
        if (err) {
            console.log("Logger write error:", err)
        }
    })
    next()
}
