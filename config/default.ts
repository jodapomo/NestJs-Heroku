export default {
    // HOST: 'https://praxis-homework.herokuapp.com',
    HOST: process.env.HOST || 'http://localhost',
    PORT: process.env.PORT || 3000,
    MONGO_URI: 'mongodb://admin:admin123@ds133622.mlab.com:33622/homeworkdb',
}