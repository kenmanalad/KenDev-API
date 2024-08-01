const home = (req,res) => {
    res.status(200).json({
        message: "hello world",
        statement: "This is a test!!!",
        number: 1
    })

}

export default home;