// Mock data - replace with actual API calls
const mockBirds = [
    { id: 1, name: 'Blue Jay', species: 'Cyanocitta cristata', image: 'https://as2.ftcdn.net/v2/jpg/06/79/26/25/1000_F_679262593_ay1fXp7QMwI6pq0ZMEuPYDAJDMLSmwIN.webp', habitat: 'Forests', diet: 'Omnivore' },
    { id: 2, name: 'American Robin', species: 'Turdus migratorius', image: 'https://as1.ftcdn.net/v2/jpg/06/27/16/58/1000_F_627165882_fjRbSSdBbTnjzQNN2YbvfsUzW63rYzMX.webp', habitat: 'Gardens', diet: 'Omnivore' },
    { id: 3, name: 'Northern Cardinal', species: 'Cardinalis cardinalis', image: 'https://as2.ftcdn.net/v2/jpg/06/00/23/67/1000_F_600236751_i6v8l9dbPYHODm4PcABQsaB114XLN86J.webp', habitat: 'Woodlands', diet: 'Granivore' },
    { id: 4, name: 'House Sparrow', species: 'Passer domesticus', image: 'https://as2.ftcdn.net/v2/jpg/12/38/56/49/1000_F_1238564900_tvLf3ywXkqI2dDE2MrEa1HGSseiiBp4t.webp', habitat: 'Urban areas', diet: 'Omnivore' },
    { id: 5, name: 'Peregrine Falcon', species: 'Falco peregrinus', image: 'https://as1.ftcdn.net/v2/jpg/13/26/26/60/1000_F_1326266041_ZtgYIdZR1g1XeSsUxLTwfkasMwQND7lw.webp', habitat: 'Cliffs and tall buildings', diet: 'Carnivore' },
    { id: 6, name: 'Bald Eagle', species: 'Haliaeetus leucocephalus', image: 'https://as2.ftcdn.net/v2/jpg/10/93/63/21/1000_F_1093632177_e2xZWbocy0FYl8vtqK7S9Tw82VKD5HDj.webp', habitat: 'Near large bodies of open water', diet: 'Carnivore' },
    // ... rest of bird data
  ];
  
  export const loadBirdsFromApi = async () => {
    // Replace this with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockBirds);
      }, 500);
    });
  
    // When ready to use real API:
    // const response = await fetch('/api/birds');
    // return await response.json();
  };