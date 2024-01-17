<template>
  <div>
    <h1>Student Details</h1>
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Address</th>
          <th>Email</th>
          <th>Contact Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in students" :key="index">
          <td>{{ student.firstname }}</td>
          <td>{{ student.lastname }}</td>
          <td>{{ student.address }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.contactnumber }}</td>
          <td>
          <button class="edit-button" @click="editStudent(index)">Edit</button>
          <button class="delete-button" @click="deleteStudent(index)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Subject Details  -->
  <h1>Subject Details</h1>
  
  <table>
    <thead>
      <tr>
        <th>Subject Code</th>
        <th>Subject Name</th>
        <th>Actions</th>
      </tr>
    </thead>
   
    <tbody>
      <tr v-for="(subject, index) in subjects" :key="index">
        <td>{{ subject.subjectCode }}</td>
        <td>{{ subject.subjectName }}</td>
        <td>
          <button class ="add-button" @click="addsubject(index)">Add</button>
          <button class="edit-button" @click="editSubject(index)">Edit</button>
          <button class="delete-button" @click="deleteSubject(index)">Delete</button>
          
        </td>
      </tr>
    </tbody>
  </table>

  </div>
</template>

<script>
export default {
  name: "StudentDetails",
  data() {
    return {
      students: [
        {
          firstname: "John",
          lastname: "Doe",
          address: "123 Main St",
          email: "john.doe@example.com",
          username: "john_doe",
          contactnumber: "1234567890",
        },
      ],
        subjects: [
      {
        subjectCode: "CS101",
        subjectName: "Introduction to Computer Science",
      },

      ],
    };
  },
  methods: {
    editStudent(index) {
      const editedStudent = { ...this.students[index] };
      console.log("Editing student:", editedStudent);
    },
    

    deleteStudent(index) {
      const deletedStudent = { ...this.students[index] };
      if (confirm(`Are you sure you want to delete ${deletedStudent.firstname} ${deletedStudent.lastname}?`)) {
        this.students.splice(index, 1);
        console.log("Deleted student:", deletedStudent);
      }
    },

    editSubject(index) {
    const editedSubject = { ...this.subjects[index] };
    
    console.log("Editing subject:", editedSubject);
  },
  deleteSubject(index) {
    const deletedSubject = { ...this.subjects[index] };
    if (confirm(`Are you sure you want to delete ${deletedSubject.subjectName}?`)) {
      this.subjects.splice(index, 1);
      console.log("Deleted subject:", deletedSubject);
    }
  },
  },
};


</script>

<style scoped>
  table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

button {
  padding: 8px 12px;
  margin-right: 5px;
  cursor: pointer;
  text-align: center;
}

.add-button{
  background-color: #2fb8a5;
  color: white;
  border: 1px solid #89c6d1;
}
.edit-button {
  background-color: #4caf50;
  color: white;
  border: 1px solid #4caf50;
 
}

.delete-button {
  background-color: #f44336;
  color: white;
  border: 1px solid #f44336;
  
}
</style>