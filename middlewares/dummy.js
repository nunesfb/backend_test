module.exports = (req, res, next) => {
  const responseTime = Date.now() - req.startTime;
  console.log(`method: ${req.method}`) 
  console.log(`responseTime: ${responseTime}`)
  next();
}
