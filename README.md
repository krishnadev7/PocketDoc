
# PocketDoc

file:///home/krish/Pictures/Screenshots/Screenshot%20from%202024-08-18%2015-40-45.png


PocketDoc is a healthcare management system designed to streamline the process of scheduling appointments with doctors. Built using Next.js, Tailwind CSS for styling, and ShadCN for UI components, it offers a seamless user experience. The system includes an admin dashboard for managing appointments, allowing admins to cancel or schedule appointments as needed. Twilio integration enables SMS notifications to keep users informed, while Appwrite serves as the database backend to store and manage data securely


## Tech Stack

**Client:** Next.js
Typescript
TailwindCSS
ShadCN


**Server:** Appwrite, Express, Twilio


## Features

▶️ Register as a Patient: Users can sign up and create a     personal profile as a patient.

▶️ Book a New Appointment with a Doctor: Patients can conveniently schedule appointments with doctors and book multiple appointments.

▶️ Manage Appointments on the Admin Side: Administrators can efficiently view and manage all scheduled appointments.

▶️ Confirm/Schedule Appointments from the Admin Side: Admins can confirm and set appointment times to ensure they are properly scheduled.

▶️ Cancel Appointments from the Admin Side: Administrators have the ability to cancel appointments as needed.

▶️ Send SMS on Appointment Confirmation: Patients receive SMS notifications to confirm their appointment details.

▶️ Complete Responsiveness: The application works seamlessly on all devices and screen sizes.

▶️ File Upload Using Appwrite Storage: Users can securely upload and store files within the app using Appwrite storage services.



## Installation

Follow these steps to set up the project locally on your machine.

Prerequisites

Make sure you have the following installed on your machine:

Git, 
Node.js,
npm (Node Package Manager)

### Cloning the Repository
```bash
  git clone https://github.com/krishnadev7/PocketDoc.git
  cd PocketDoc
```

### Installation
Install the project dependencies using npm:
```bash
  npm install
```
### Running the Project
```bash
  npm run dev
```
    
## Environment Variables

Create a new file named .env.local in the root of your project and add the following content:

#APPWRITE
`NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1`

`PROJECT_ID=`

`API_KEY=`

`DATABASE_ID=`

`PATIENT_COLLECTION_ID=`

`APPOINTMENT_COLLECTION_ID=`

`NEXT_PUBLIC_BUCKET_ID=`

`NEXT_PUBLIC_ADMIN_PASSKEY=111111`

Replace the placeholder values with your actual Appwrite credentials. You can obtain these credentials by signing up on the [Appwrite website](https://appwrite.io/).

