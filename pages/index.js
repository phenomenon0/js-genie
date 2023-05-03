import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  const safe = null;
  const last_query = null;

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
      <div>
        <Head>
          <title>Football Genie</title>
        </Head>

      <div className={styles.background}></div>
        <div className={styles.container}>
          <div id={styles.headerContainer}>

            <div id={styles.imageDiv}>
              <img src="/football.png" className={styles.smallImage}  alt="screaming-man"/>
              <h4>Name the Icon</h4>
            </div>

            <form id="query-form" action="/" method="post">
              <input type="text" name="animal" placeholder="Ask football questions" required/>
              <input type="submit" value="Search"/>
            </form>

          </div>

          {
            last_query &&
            <div className="last-query">
                Last query: { last_query }
            </div>
          }

          {
            <div className="result">
              <div id="result-div">
                {
                  result | safe
                }
              </div>
            </div>
          }

        </div>
      </div>
  );
}