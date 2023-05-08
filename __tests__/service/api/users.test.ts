import { ResponsePaginationUsers } from "@/models";
import { getRestUsers } from "@/service/api/users";

describe('getRestUsers', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch users data successfully', async () => {
    // Given
    const mockResponse: ResponsePaginationUsers = {
      page: 1,
      per_page: 10,
      total: 100,
      total_pages: 10,
      data: [
        { id: 1, email: 'user1@example.com', first_name: 'John', last_name: 'Doe', avatar: 'avatar1.jpg' },
        { id: 2, email: 'user2@example.com', first_name: 'Jane', last_name: 'Smith', avatar: 'avatar2.jpg' },
      ],
    };
    const mockFetchPromise = Promise.resolve({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    (global.fetch as jest.Mock).mockImplementationOnce(() => mockFetchPromise);

    // When
    const result = await getRestUsers(1);

    // Then
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://reqres.in/api/users?page=1');
    expect(result).toEqual(mockResponse);
  });

  it('should handle fetch error', async () => {
    // Given
    const mockFetchPromise = Promise.reject(new Error('Fetch error'));
    (global.fetch as jest.Mock).mockImplementationOnce(() => mockFetchPromise);

    // When
    await expect(getRestUsers(1)).rejects.toThrowError('Fetch error');

    // Then
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://reqres.in/api/users?page=1');
  });
});