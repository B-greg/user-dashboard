import { Pagination } from "@/components";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";


describe('Pagination', () => {
    const currentPage = 3;
    const totalPages = 10;
    const onChange = jest.fn();
  
    it('renders pagination correctly', () => {
      render(<Pagination currentPage={currentPage} totalPages={totalPages} onChange={onChange} />);
  
      const previousButton = screen.getByTestId('button-previous');
      expect(previousButton).toBeInTheDocument();
  
      const nextButton = screen.getByTestId('button-next');
      expect(nextButton).toBeInTheDocument();
  
      const pageButtons = screen.getAllByRole('button', { name: /[0-9]/ });
      expect(pageButtons).toHaveLength(5); // Assuming a totalPageNumbers value of 5
  
      fireEvent.click(pageButtons[0]);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(1);
  
      fireEvent.click(pageButtons[4]);
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(5);
  
      fireEvent.click(previousButton);
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenCalledWith(1);
  
      fireEvent.click(nextButton);
      expect(onChange).toHaveBeenCalledTimes(4);
      expect(onChange).toHaveBeenCalledWith(10);
    });
  });