# Chips & Bytes Frontend

This is the **Frontend** for the Chips & Bytes website, built with [React](https://react.dev/).  
It provides the user interface for events, announcements, blogs, projects, and admin management.

---

##  Getting Started

### 1. **Install Dependencies**

```sh
npm install
```

### 2. **Run the Development Server**

```sh
npm start
```
- The app will be available at [http://localhost:3000](http://localhost:3000).

### 3. **Build for Production**

```sh
npm run build
```
- Output will be in the `build/` folder.

---

##  Project Structure

```
Frontend/
├── public/           # Static assets (images, favicon, manifest, etc.)
├── src/              # Source code
│   ├── components/   # Reusable React components
│   ├── data/         # Static data/constants
│   ├── App.js        # Main app component
│   └── index.js      # Entry point
├── package.json      # Project metadata and scripts
└── README.md         # This file
```

---

##  Environment Variables

- `.env` and `.env.local` can be used to set API endpoints and other environment-specific settings.
- Example:
  ```
  REACT_APP_API_URL=http://localhost:3001/
  ```

---

##  Scripts

| Command         | Description                |
|-----------------|---------------------------|
| `npm start`     | Start development server  |
| `npm run build` | Build for production      |
| `npm test`      | Run tests                 |

---

##  Documentation

- Source code is documented with JSDoc comments.
- To generate documentation, use:
  ```sh
  npx jsdoc -c jsdoc.json
  ```
  Output will be in the `docs/` folder (if configured).

---

##  Admin Features

- Admin login and dashboard are available at `/admin`.
- Admins can manage events, announcements, and past events.

---

##  Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

##  License

This project is licensed under the MIT License.

---

##  Contact

For questions or support, contact the Chips & Bytes
