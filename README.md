<div id="top"></div>

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://github.com/stanleyclaudius/library-api">
    <img src="view/img/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Simple Library API</h3>

  <p align="center">
    An API for library application that allowed user to borrow and return books
    <br />
    <a href="https://simple-library-api.herokuapp.com"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://simple-library-api.herokuapp.com">View Demo</a>
    ·
    <a href="https://github.com/stanleyclaudius/library-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/stanleyclaudius/library-api/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

**Library API** is an API that created for a school or college library that wanted to create an application that have borrow and return books functionality for their user. This API also allowed their user to do authentication features, such as login and register, so, the library can just uses the API without implementing basic features again for the application.

<p align="right"><a href="#top">back to top</a></p>

### Built With

Main technology used to built this application are listed below:

* [Typescript](https://www.typescriptlang.org/)
* [MongoDB](https://mongodb.com/cloud/atlas/)
* [Node.js](https://nodejs.org/)
* [Express.js](http://expressjs.com/)

<p align="right"><a href="#top">back to top</a></p>

## Getting Started

To get started with this project locally, follow below steps:

### Prerequisites

Make sure you have package manager (either npm or yarn)

>**FYI**: This project uses **yarn** as package manager, but you're free to use **npm** too.

### Installation

Below steps will guide you through the local installation process of this application

1. Get your MongoDB cloud connection at [here](https://mongodb.com/cloud/atlas)
2. Clone the repo
   ```
   git clone https://github.com/stanleyclaudius/library-api.git
   ```
3. Install project dependency<br />
Make sure that your terminal pointing at the root directory of this project (library-api folder).
   ```
   yarn install
   ```
4. Complete the .env variable<br/>
Rename .env.example file at ```/config``` directory become ```.env```, then fill the value for every key. Below is the guideline for filling the .env value:<br/>
    | Key | What To Fill | Example Value |
    | :---: | :---: | :---: |
    | PORT | Your server port | 5000 |
    | MONGODB_URI | Your MongoDB URL | mongodb://user:user1234@main-shardxxxx |
    | ACCESS_TOKEN_SECRET | Random complex string for JWT | DUhxdx183)_--aACN#2% |
    | REFRESH_TOKEN_SECRET | Random complex string for JWT | 17hdjcD7ud(-*&732~ |
5. Lastly, run below command at your terminal to spin off the application
    ```
    yarn run dev
    ```

<p align="right"><a href="#top">back to top</a></p>

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right"><a href="#top">back to top</a></p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right"><a href="#top">back to top</a></p>

## Contact

LinkedIn: [Stanley Claudius](https://www.linkedin.com/in/stanley-claudius-4560b21b7)

Project Link: [https://github.com/stanleyclaudius/library-api](https://github.com/stanleyclaudius/library-api)

<p align="right"><a href="#top">back to top</a></p>

## Acknowledgments

Special thanks to:

* [Othneildrew](https://github.com/othneildrew/) for providing an amazing README template.
* [Heroku](https://herokuapp.com) for providing hosting service for this application.

<p align="right"><a href="#top">back to top</a></p>

[forks-shield]: https://img.shields.io/github/forks/stanleyclaudius/library-api.svg?style=for-the-badge
[forks-url]: https://github.com/stanleyclaudius/library-api/network/members
[stars-shield]: https://img.shields.io/github/stars/stanleyclaudius/library-api.svg?style=for-the-badge
[stars-url]: https://github.com/stanleyclaudius/library-api/stargazers
[issues-shield]: https://img.shields.io/github/issues/stanleyclaudius/library-api.svg?style=for-the-badge
[issues-url]: https://github.com/stanleyclaudius/library-api/issues
[license-shield]: https://img.shields.io/github/license/stanleyclaudius/library-api.svg?style=for-the-badge
[license-url]: https://github.com/stanleyclaudius/library-api/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/stanley-claudius-4560b21b7
