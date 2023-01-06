import { useState } from "react";
let api_origin = "http://localhost:8080";
let token = localStorage.getItem("token");

export function useFetch() {
  async function post(url: string, data: string | Object) {
    let res = await fetch(api_origin + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async function get(url: string) {
    let res = await fetch(api_origin + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return res.json();
  }

  return { post, get };
}
