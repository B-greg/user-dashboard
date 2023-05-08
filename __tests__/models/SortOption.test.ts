import SortOption, { stringToSortOption } from "@/models/SortOption";

describe('stringToSortOption', () => {
    it('should return SortOption.FirstName for "First Name"', () => {
      const option = stringToSortOption('First Name');
  
      expect(option).toBe(SortOption.FirstName);
    });
  
    it('should return SortOption.LastName for "Last Name"', () => {
      const option = stringToSortOption('Last Name');
  
      expect(option).toBe(SortOption.LastName);
    });
  
    it('should return SortOption.ID for "ID"', () => {
      const option = stringToSortOption('ID');
  
      expect(option).toBe(SortOption.ID);
    });
  
    it('should return undefined for invalid option', () => {
      const option = stringToSortOption('Invalid Option');
  
      expect(option).toBeUndefined();
    });
  });
  