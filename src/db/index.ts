import { MongoClient } from 'mongodb';

export default class MongoDB {
  url = 'mongodb+srv://username:Lliowr8h49xJC7Wx@cluster0.vacku.mongodb.net/CabRegister?retryWrites=true&w=majority';
  client = new MongoClient(this.url);
  db = this.client.db('CabRegister');

  constructor() {
    console.log('Connecting to MongoDB...');
    this.client
      .connect()
      .then(function () {
        console.log('Connected to MongoDB');
      })
      .catch(function (error) {
        console.log('Error Connecting to MongoDB...');
        console.log(error);
      });
  }

  close() {
    this.client
      .close()
      .then(function () {
        console.log('Dis-Connected from MongoDB');
      })
      .catch(function (error) {
        console.log('Error Connecting from MongoDB...');
        console.log(error);
      });
  }
}
