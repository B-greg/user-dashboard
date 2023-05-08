import { ShortMenu } from "@/components";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("ShortMenu", () => {
  const options = ["Option 1", "Option 2", "Option 3"];
  const selectedOption = "Option 2";
  const onChange = jest.fn();

  it("renders options and handles change correctly", () => {
    render(
      <ShortMenu
        selectedOption={selectedOption}
        options={options}
        onChange={onChange}
      />
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    options.forEach((option) => {
      const optionElement = screen.getByText(option);
      expect(optionElement).toBeInTheDocument();
    });

    fireEvent.change(selectElement, { target: { value: "Option 3" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("Option 3");
  });
});
