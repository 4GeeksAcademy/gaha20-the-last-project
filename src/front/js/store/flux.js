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
          localStorage.setItem("userLogged", JSON.stringify(data));
          setStore({ userLogged: data });
          return data;
        } catch (error) {
          console.log("usuario no es valido", error);
        }
      },
    },
  };
};

export default getState;
