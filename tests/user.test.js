import { getFirstName, isValidPassword } from "../src/utils/user"

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


test("Shuold reject password shorter than 8 character", () =>
{
  const isValid = isValidPassword("abcd123")

  expect(isValid).toBe(false)
})

test("Shuold reject password that contains word password", () =>
{
  const isValid = isValidPassword("abcd123password")

  expect(isValid).toBe(false)
})

test("Shuold correctly validate a valid password", () =>
{
  const isValid = isValidPassword("01232525113")

  expect(isValid).toBe(true)
})