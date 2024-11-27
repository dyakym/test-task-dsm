export default function tableHandler() {
  const url = "https://63ee0ec0388920150dd83e3c.mockapi.io/teams";
  const tableWrapper = document.querySelector(".tournament");
  const filterButtons = document.querySelectorAll(".tournament__filter-item");
  const tableGroups = document.querySelectorAll(".table__wrapper");

  if (!tableWrapper) {
    return;
  }

  tableWrapper.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("tournament__filter-item")) {
      filterButtons.forEach((button) => {
        const buttonId = button.id;

        if (button === target) {
          tableGroups.forEach((item) => {
            if (item.id === buttonId) {
              item.classList.remove("hidden");
            } else {
              item.classList.add("hidden");
            }
          });
          button.classList.add("tournament__filter-item--active");
          if (buttonId !== "default") {
            try {
              fetch(url)
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  const groupA = data
                    .filter((item: any) => item.group === "A")
                    .sort((a: any, b: any) => b.points - a.points);
                  const groupB = data
                    .filter((item: any) => item.group === "B")
                    .sort((a: any, b: any) => b.points - a.points);
                  const groupC = data
                    .filter((item: any) => item.group === "C")
                    .sort((a: any, b: any) => b.points - a.points);
                  const tabelContainer: any = document.querySelector(
                    `.table__wrapper#${buttonId}`
                  );
                  const tableA = tabelContainer.querySelector("#groupA");
                  const tableB = tabelContainer.querySelector("#groupB");
                  const tableC = tabelContainer.querySelector("#groupC");

                  function populateTable(group: any[], table: any) {
                    if (table) {
                      const tbody = table.querySelector("tbody");
                      if (tbody) {
                        tbody.innerHTML = "";

                        group.forEach((item, i) => {
                          const row = document.createElement("tr");
                          row.classList.add("table__row");
                          row.classList.add("table__row--body");

                          const cellTeam = document.createElement("td");
                          cellTeam.classList.add("table__body--team");
                          let numClass = "table__body--num--";
                          if (i <= 1) {
                            numClass += "top2";
                          } else if (i === 2) {
                            numClass += "third";
                          } else {
                            numClass += "fourth";
                          }
                          cellTeam.innerHTML = `
                            <span class="table__body--num ${numClass}">
                              ${i + 1}
                              <span class="table__body--hover-effect">Лига чемпионов</span>
                            </span>
                            <img src="${item.logo}" alt="${
                            item.name
                          }" class="table__body--logo" />
                            <span class="table__body--name">${item.name}</span>
                          `;

                          const cellGames = document.createElement("td");
                          cellGames.classList.add("table__body--games");
                          cellGames.textContent = item.games;

                          const cellWins = document.createElement("td");
                          cellWins.classList.add("table__body--wins");
                          cellWins.textContent = item.wins;

                          const cellDraw = document.createElement("td");
                          cellDraw.classList.add("table__body--draw");
                          cellDraw.textContent = item.draws;

                          const cellLoses = document.createElement("td");
                          cellLoses.classList.add("table__body--lose");
                          cellLoses.textContent = item.loses;

                          const cellGoals = document.createElement("td");
                          cellGoals.classList.add("table__body--goals");
                          cellGoals.textContent = `${item.scored} - ${item.conceded}`;

                          const cellForm = document.createElement("td");
                          cellForm.classList.add("table__body--form");
                          const conditionWrapper =
                            document.createElement("span");
                          conditionWrapper.classList.add("condition__wrapper");
                          item.form.forEach((element: string) => {
                            const elementForm = document.createElement("span");
                            elementForm.classList.add("condition");
                            if (element === "W") {
                              elementForm.classList.add("condition__win");
                            } else if (element === "D") {
                              elementForm.classList.add("condition__draw");
                            } else {
                              elementForm.classList.add("condition__lose");
                            }
                            conditionWrapper.appendChild(elementForm);
                          });
                          cellForm.appendChild(conditionWrapper);

                          const cellPoints = document.createElement("td");
                          cellPoints.classList.add("table__body--points");
                          cellPoints.textContent = item.points;

                          row.appendChild(cellTeam);
                          row.appendChild(cellGames);
                          row.appendChild(cellWins);
                          row.appendChild(cellDraw);
                          row.appendChild(cellLoses);
                          row.appendChild(cellGoals);
                          row.appendChild(cellForm);
                          row.appendChild(cellPoints);

                          tbody.appendChild(row);
                        });
                      }
                    }
                  }

                  populateTable(groupA, tableA);
                  populateTable(groupB, tableB);
                  populateTable(groupC, tableC);
                });
            } catch (error) {
              console.log(error);
            }
          }
        } else {
          button.classList.remove("tournament__filter-item--active");
        }
      });
    }
  });
}
