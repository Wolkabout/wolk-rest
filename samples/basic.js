// Copyright 2018, Wolkabout
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License

const { WolkREST, InMemoryStorage } = require('../dist');
const wolkRest = new WolkREST('https://api-demo.wolkabout.com/', new InMemoryStorage());

const signIn = () => {
  wolkRest.auth().emailSignIn({
    username: 'username',
    password: 'password'
  })
    .then(({ data: userDetails }) => console.log(userDetails))
    .catch(errorData => console.error(errorData));
}

signIn();
