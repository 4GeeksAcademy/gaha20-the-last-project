const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      userLogged: JSON.parse(localStorage.getItem("userLogged")) || null,
      allSportCenter: [],
      allUser: [],
      allCourt: [],
      allCourtSchedule: [],
    },
    actions: {
      // Use getActions to call a function within a fuction

      getLoginVerificar: async (email, password) => {
        const user = {
          email: email,
          password: password,
        };
        try {
          const requestConfig = {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json",
            },
          };
          // fetching data from the backend
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/login",
            requestConfig
          );
          const data = await resp.json();

          if (data.token) {
            localStorage.setItem("userLogged", JSON.stringify(data));
            setStore({ userLogged: data });
            return true;
          }
          setStore({ userLogged: data });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error login from backend", error);
        }
      },
      logout: () => {
        localStorage.removeItem("userLogged");
        setStore({ userLogged: null });
      },
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },

      login: async (email, password) => {
        const user = {
          email: email,
          password: password,
        };
        try {
          const requestConfig = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          };
          const response = await fetch(
            process.env.BACKEND_URL + "/api/login",
            requestConfig
          );
          const data = await response.json();
          if (data.token) {
            localStorage.setItem("userLogged", JSON.stringify(data));
            setStore({ userLogged: data });
            return true;
          }
          // localStorage.setItem("userLogged", JSON.stringify(data));
          // setStore({ userLogged: data });
          return data;
        } catch (error) {
          console.log("Invalid User", error);
        }
      },

      createSportCenter: async (sportCenterData) => {
        try {
          const requestConfig = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(sportCenterData),
          };
          const response = await fetch(
            process.env.BACKEND_URL + "/api/sport_center",
            requestConfig
          );
          const data = await response.json();
          return data;
        } catch (error) {
          console.log("Verify your inputs", error);
        }
      },
      allSportCenterGet: async () => {
        try {
          const requestConfig = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(),
          };
          const response = await fetch(
            process.env.BACKEND_URL + "/api/sport_center",
            requestConfig
          );
          const data = await response.json();
          setStore({ allSportCenter: data });
          return data;
        } catch (error) {
          console.log("Verify your inputs", error);
        }
      },
      allUserGet: async () => {
        try {
          const requestConfig = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(),
          };
          const response = await fetch(
            process.env.BACKEND_URL + "/api/user",
            requestConfig
          );
          const data = await response.json();
          // setStore({ allUser: data });
          if (data.length > 0) {
            setStore({ allUser: data });
            return data;
          } else {
            // Execute another function and send userAdmin data
            const userName = "superadmin";
            const firstName = "superadmin";
            const lastName = "superadmin";
            const email = "superadmin@sportzonemanager.com";
            const password = "123456";
            const user_type = "superadmin";

            getActions().signUp(
              userName,
              firstName,
              lastName,
              email,
              password,
              user_type
            ); // Call another function and pass userAdmin data
            return userAdmin; // Return userAdmin data
          }
        } catch (error) {
          console.log("Verify your inputs", error);
        }
      },
      editUserPutUserType: async (idUser, userType) => {
        console.log("id", idUser);
        console.log("userType", userType);
        const userTypeEdit = {
          user_type: userType,
        };
        try {
          const requestConfig = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userTypeEdit),
          };
          const response = await fetch(
            process.env.BACKEND_URL + "/api/user/" + idUser,
            requestConfig
          );
          const data = await response.json();
          console.log(data);
          // setStore({ allUser: data });
          return data;
        } catch (error) {
          console.log("Verify your inputs", error);
        }
      },
      signUp: async (
        userName,
        firstName,
        lastName,
        email,
        password,
        user_type
      ) => {
        const user = {
          user_name: userName,
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          user_type: user_type || "user",
        };
        console.log(user);
        try {
          const requestConfig = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          };
          const response = await fetch(
            process.env.BACKEND_URL + "/api/user",
            requestConfig
          );
          const data = await response.json();
          return data;
        } catch (error) {
          console.log("Verify your inputs", error);
        }
      },
      price: () => {
        const number = 100;
        return Math.floor(Math.random() * number);
      },
      allCourtGet: async () => {
        try {
          const requestConfig = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(),
          };
          const response = await fetch(
            process.env.BACKEND_URL + "/api/court",
            requestConfig
          );
          const data = await response.json();
          setStore({ allCourt: data });
          return data;
        } catch (error) {
          console.log("Verify your inputs", error);
        }
      },

      createCourtSportCenter: async (courtSportCenterData) => {
        try {
          const requestConfig = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(courtSportCenterData),
          };
          const response = await fetch(
            process.env.BACKEND_URL + "/api/court",
            requestConfig
          );
          const data = await response.json();
          return data;
        } catch (error) {
          console.log("Verify your inputs", error);
        }
      },
      allCourtScheduleGet: async () => {
        try {
          const requestConfig = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(),
          };
          const response = await fetch(
            process.env.BACKEND_URL + "/api/court_schedule",
            requestConfig
          );
          const data = await response.json();
          setStore({ allCourtSchedule: data });
          return data;
        } catch (error) {
          console.log("Verify your inputs", error);
        }
      },
      createCourtSchedule: async (courtScheduleData) => {
        try {
          const requestConfig = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(courtScheduleData),
          };
          const response = await fetch(
            process.env.BACKEND_URL + "/api/court_schedule",
            requestConfig
          );
          const data = await response.json();
          return data;
        } catch (error) {
          console.log("Verify your inputs", error);
        }
      },
    },
  };
};

export default getState;
