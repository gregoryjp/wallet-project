const handleHttpError = (error, req, res, next) => {
    if (!error.code) {
        res.status(500).json({ error: error });

    }
    console.log(`[${error.message}]-${error.code}`)
    res.status(error.code).json({ error: error.message });
};



module.exports = { handleHttpError };