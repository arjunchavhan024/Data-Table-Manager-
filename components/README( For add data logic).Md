<!-- # 📦 Add Data Popup Form - React + MUI Feature

This feature allows users to **click an "Add Data" button**, fill a **popup form with Name, Email, and Mobile Number**, and then **display the submitted data** at the bottom of the page. It is implemented using **React hooks** and **Material-UI (MUI)** components.

---

## 🚀 What This Feature Does

- Shows a popup dialog (`MUI Dialog`) when "Add Data" is clicked.
- Provides three input fields: **Name**, **Email**, **Mobile No**.
- Saves the entered data to local state.
- Displays a list of submitted entries below the toolbar.

---

## 🧱 Technologies Used

- React (functional components)
- Material-UI v5 (`@mui/material`)
- JavaScript ES6

---

## 🛠 How the Logic Works (Step-by-Step)

### 1. **Setup Component State**

```js
const [dialogOpen, setDialogOpen] = useState(false); // Controls popup visibility
const [name, setName] = useState("");                // Stores entered name
const [email, setEmail] = useState("");              // Stores entered email
const [mobile, setMobile] = useState("");            // Stores entered mobile number
const [dataList, setDataList] = useState([]);        // Array of all submitted entries



const handleDialogOpen = () => setDialogOpen(true);    // Opens the popup
const handleDialogClose = () => {
  setDialogOpen(false);
  setName(""); setEmail(""); setMobile("");            // Resets fields on close
};




const handleSubmitData = () => {
  if (name.trim() && email.trim() && mobile.trim()) {
    setDataList(prev => [...prev, { name, email, mobile }]); // Add to list
    handleDialogClose();                                      // Close dialog
  }
};
// Checks that all fields are filled (.trim() removes whitespace).

// Appends the new object to dataList.

// Resets and closes the dialog.



"Add Data" Button (in Toolbar)
jsx
Copy
Edit
<Button onClick={handleDialogOpen} style={{ color: "red" }}>
  Add Data
</Button>
When clicked, sets dialogOpen = true, which shows the popup.

5. Dialog with Input Fields
jsx
Copy
Edit
<Dialog open={dialogOpen} onClose={handleDialogClose}>
  <DialogTitle>Add New Entry</DialogTitle>
  <DialogContent>
    <TextField label="Name" value={name} onChange={...} />
    <TextField label="Email" value={email} onChange={...} />
    <TextField label="Mobile No" value={mobile} onChange={...} />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleDialogClose}>Cancel</Button>
    <Button onClick={handleSubmitData}>Submit</Button>
  </DialogActions>
</Dialog>
Uses MUI’s Dialog, DialogTitle, DialogContent, DialogActions.

Binds inputs to their respective state values.

Submits via handleSubmitData.

6. Displaying Submitted Data
jsx
Copy
Edit
{dataList.length > 0 && (
  <ul>
    {dataList.map((item, index) => (
      <li key={index}>
        Name: {item.name} | Email: {item.email} | Mobile: {item.mobile}
      </li>
    ))}
  </ul>
)}
Iterates over dataList using .map() and displays each entry.

🧪 Example Output (After Submit)
yaml
Copy
Edit
Entered Data:
• Name: Arjun Chavhan | Email: arjun@example.com | Mobile: 9876543210 -->
