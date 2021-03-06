function testLocalStorage() {
  const testObject = { 'one': 1, 'two': 2, 'three': 3 };
  console.log('typeof testObject: ' + typeof testObject);
  console.log('testObject properties:');
  for (let prop in testObject) {
      console.log('  ' + prop + ': ' + testObject[prop]);
  }

  // Put the object into storage
  localStorage.setItem('testObject', testObject);

  // Retrieve the object from storage
  var retrievedObject = localStorage.getItem('testObject');

  console.log('typeof retrievedObject: ' + typeof retrievedObject);
  console.log('Value of retrievedObject: ' + retrievedObject);
}

testLocalStorage();
