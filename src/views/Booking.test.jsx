import { beforeEach , expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RouterProvider , MemoryRouter } from "react-router-dom";
import Booking from "./Booking";
import Shoes from "../components/Shoes/Shoes";
import userEvent from "@testing-library/user-event";

describe("Make a booking", () => {
  test(" Should be able to make a booking and get confirmation", async () => {
    render(<MemoryRouter><Booking /></MemoryRouter>
    );

    userEvent.type(screen.getByLabelText(/date/i), "2023-12-08");
    userEvent.type(screen.getByLabelText(/time/i), "17:00");
    userEvent.type(screen.getByLabelText(/number of awesome bowlers/i), "7");
    userEvent.type(screen.getByLabelText(/number of lanes/i), "2");

    await waitFor(() => {
      const confirmationMessage = screen.getByText(/strIIIIIike!/i);
      expect(confirmationMessage).toBeInTheDocument();
    });
  });
});





describe("Choose date and time for booking ", () => {
  test("Should be able to select a date", () => {
    render( <MemoryRouter><Booking /></MemoryRouter>
    );

    const dateInput = screen.getByLabelText(/date/i);
    fireEvent.change(dateInput, { target: { value: "2023-12-08" } });
    expect(dateInput.value).toBe("2023-12-08");
  });

  test("Should be able to select a time", () => {
    render(<MemoryRouter><Booking /></MemoryRouter>
    );

    const timeInput = screen.getByLabelText(/time/i);
    fireEvent.change(timeInput, { target: { value: "17:00" } });
    expect(timeInput.value).toBe("17:00");
  });
});


  describe("Choose nr of players and lanes", () => {
    test(" Should be able to add nr of players and lanes", () => {
      render(<MemoryRouter><Booking /></MemoryRouter>
      );

      const playersInput = screen.getByLabelText(/number of awesome bowlers/i);
      fireEvent.change(playersInput, { target: { value: "7" } });
      expect(playersInput.value).toBe("7");

      const lanesInput = screen.getByLabelText(/number of lanes/i);
      fireEvent.change(lanesInput, { target: { value: "2" } });
      expect(lanesInput.value).toBe("2");
    });



    describe("Adding and removing shoe size for players", () => {
      test("Should be able to add a shoe size", async () => {
        const updateSize = vi.fn();
        const addShoe = vi.fn();
        const removeShoe = vi.fn();
        const shoes = [];
    
        const { rerender } = render(
          <Shoes
            updateSize={updateSize}
            addShoe={addShoe}
            removeShoe={removeShoe}
            shoes={shoes}
          />
        );
    
        const addButton = screen.getByRole("button", { name: "+" });
        await userEvent.click(addButton);
    
        shoes.push({ id: vi.fn().mockReturnValue("1"), size: "" });
        rerender(
          <Shoes
            updateSize={updateSize}
            addShoe={addShoe}
            removeShoe={removeShoe}
            shoes={shoes}
          />
        );
    
        const shoeSizeInputs = screen.getAllByRole("textbox");
        expect(shoeSizeInputs).toHaveLength(shoes.length);
        expect(addShoe).toHaveBeenCalled();
      });
    
      test("Should be able to remove a shoe size", async () => {
        const updateSize = vi.fn();
        const addShoe = vi.fn();
        const removeShoe = vi.fn();
        const shoes = [{ id: "1", size: "41" }];
    
        const { rerender } = render(
          <Shoes
            updateSize={updateSize}
            addShoe={addShoe}
            removeShoe={removeShoe}
            shoes={shoes}
          />
        );
    
        const removeButton = screen.getByRole("button", { name: "-" });
        await userEvent.click(removeButton);
    
        shoes.pop();
        rerender(
          <Shoes
            updateSize={updateSize}
            addShoe={addShoe}
            removeShoe={removeShoe}
            shoes={shoes}
          />
        );
    
        expect(removeShoe).toHaveBeenCalledWith("1");
        expect(shoes).toHaveLength(0);
      });
    });
  });
