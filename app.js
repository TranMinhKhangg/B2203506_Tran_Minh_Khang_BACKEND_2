
const express = require("express");
const cors = require("cors");

const contactsRouter = require("./app/Routes/contact.route");

const app = express()

const ApiError = require("./app/api-error")

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json({message:"Welcome to contact book application."})
})

app.use("/api/contacts", contactsRouter);

app.use((req, res, next) => {
    //Code ở đây sẽ không chạy khi không có route định nghĩa nào
    //Khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"))
})

//define error-handling middleware last, after other app.use() and routes calls

app.use((error, req, res, next) => {
    //Middleware xử lý lỗi tập trung
    //Trong các đoạn code xử lý ở các route, gọi next(err) sẽ chuyển vào middleware xử lý lỗi này
    return res.status(error.statusCode || 500).json({
        message:error.message || "Internal Server Error",
    })
})

module.exports = app;