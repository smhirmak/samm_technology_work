const getData = async (setCoordinates) => {
  try {
    const response = await fetch('http://localhost:8080/list', { method: 'GET' }).then((res) =>
      res.json()
    );
    setCoordinates(response.data);
  } catch (error) {
    console.log(error);
  }
};

export default getData;
