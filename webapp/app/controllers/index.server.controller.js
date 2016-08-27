exports.render = function(req, res) {
  if (req.session.lastVisit) {
    console.log(req.session.lastVisit);
  }

  req.session.lastVisit = new Date();


  res.render('index', {
    title: "CloudTube",
    user: JSON.stringify(req.user)
  })
}

exports.about = function(req, res) {
  res.render('about', {
    title: "CloudTube | About",
    user: JSON.stringify(req.user)
  })
}
