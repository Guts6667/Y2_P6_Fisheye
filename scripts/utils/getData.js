const getData = async () => 
  await fetch("../../data/photographers.json").then((res) => res.json() );