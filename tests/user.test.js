import { getFirstName } from "../src/utils/user"

test('Should return fisrt name when given full name', () =>
{
  const firstname = getFirstName("Phi Bằng")
  expect(firstname).toBe("Phi")
  // if (firstname !== "Phi")
  // {
  //   throw new Error("This shuold trigger a failture")
  // }  
})  

test("Shuold return fisrt name when gieven full name", () =>
{
  const fisrtname = getFirstName("Tấn")
  expect(fisrtname).toBe("Tấn")
})