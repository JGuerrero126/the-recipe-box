let photos = "";
const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "dbwdsy3t8",
    uploadPreset: "d3csb6jk",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      photos = result.info.secure_url;
      console.log("Done! Here is the image info: ", result.info);
    }
  }
);

const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#recipe-name").value.trim();
  const cook_Time = document.querySelector("#recipe-cook_time").value.trim();
  const directions = document.querySelector("#recipe-directions").value.trim();
  const rest_Time = document.querySelector("#recipe-rest_time").value.trim();
  const prep_Time = document.querySelector("#recipe-prep_time").value.trim();
  const serves = document.querySelector("#recipe-serves").value.trim();
  const ingredients = document.querySelector("#recipe-ingredients").value.trim();
  const createdby = document.querySelector("#recipe-createdby").value.trim();

  if (name) {
    const response = await fetch(`/api/recipes`, {
      method: "POST",
      body: JSON.stringify({
        name,
        prep_Time,
        cook_Time,
        rest_Time,
        directions,
        photos,
        serves,
        ingredients,
        createdby
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create recipe");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/recipes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to delete recipe");
    }
  }
};

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, { 
    type: 'doughnut',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.9)',
                'rgba(54, 162, 235, 0.9)',
                'rgba(255, 206, 86, 0.9)',
                'rgba(75, 192, 192, 0.9)',
                'rgba(153, 102, 255, 0.9)',
                'rgba(255, 159, 64, 0.9)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    
});

document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);

document
  .querySelector(".new-recipe-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelectorAll(".gettingridof").forEach(el =>
  el.addEventListener("click", delButtonHandler));
