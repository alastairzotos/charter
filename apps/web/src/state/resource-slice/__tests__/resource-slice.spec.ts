import { createSlice, FetchStatus } from "src/state/resource-slice";

describe("createSlice", () => {
  describe("Happy path", () => {
    const requestMock = jest.fn(async (id: string) =>
      Promise.resolve(`Received: ${id}`)
    );
    const beforeRequest = jest.fn();
    const afterRequest = jest.fn();

    let response: string | null;
    let responseStatus: FetchStatus | undefined;

    beforeAll(async () => {
      const useSlice = createSlice<string, [id: string]>(
        null,
        async (id) => requestMock(id),
        {
          beforeRequest,
          afterRequest,
        }
      );

      await useSlice.getState().request("foo");

      responseStatus = useSlice.getState().status;
      response = useSlice.getState().value;
    });

    it("should have the right response values", () => {
      expect(response).toEqual("Received: foo");
      expect(responseStatus).toEqual("success");
    });

    it("should call request method", () => {
      expect(requestMock).toHaveBeenCalledWith("foo");
    });

    it("should call hooks", () => {
      expect(beforeRequest).toHaveBeenCalled();
      expect(afterRequest).toHaveBeenCalled();
    });
  });

  describe("With error", () => {
    const requestMock = jest.fn(async () => Promise.reject());

    let responseStatus: FetchStatus | undefined;

    beforeAll(async () => {
      const useSlice = createSlice<string>(null, async () => requestMock());

      await useSlice.getState().request();

      responseStatus = useSlice.getState().status;
    });

    it("should have a failed status", () => {
      expect(responseStatus).toEqual("error");
    });
  });
});
