import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'moneydancer.db',
        location: 'default'
    },
    () => {
        console.log('db opened');
      },
      error => console.log(error),
);

export default db;