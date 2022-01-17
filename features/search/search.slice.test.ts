import moxios from "moxios";
import { store } from "../../app/store";
import { searchForTerm } from "./search.slice";

describe("search slice", () => {
  beforeEach(() => {
    moxios.install();
  });

  it("performs a search", async () => {
    moxios.stubRequest("api/search", {
      response: {
        results: [
          { artistName: "the beatles", trackName: "i am the walrus", artworkUrl100: "disney.com" },
        ],
      },
    });
    const response = await store.dispatch(searchForTerm("the beatles"));
    console.log(response);
  });
});

export {};
