// Mảng chứa danh sách sinh viên
let students = [];

// Lấy các phần tử từ DOM
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');
const searchInput = document.getElementById('searchInput');
const addBtn = document.getElementById('addBtn');

// Sự kiện thêm sinh viên
studentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Lấy dữ liệu từ form
    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;
    const studentAge = document.getElementById('studentAge').value;
    const studentClass = document.getElementById('studentClass').value;
    const studentMajor = document.getElementById('studentMajor').value;
    const studentGpa = document.getElementById('studentGpa').value;

    // Kiểm tra sinh viên có tồn tại trong danh sách hay không
    const existingStudentIndex = students.findIndex(student => student.id === studentId);

    if (existingStudentIndex >= 0) {
        // Nếu sinh viên đã tồn tại, cập nhật thông tin
        students[existingStudentIndex] = {
            id: studentId,
            name: studentName,
            age: studentAge,
            class: studentClass,
            major: studentMajor,
            gpa: studentGpa
        };
    } else {
        // Nếu sinh viên chưa tồn tại, thêm mới vào danh sách
        students.push({
            id: studentId,
            name: studentName,
            age: studentAge,
            class: studentClass,
            major: studentMajor,
            gpa: studentGpa
        });
    }

    // Cập nhật bảng sinh viên
    updateStudentTable();

    // Reset form
    studentForm.reset();
});

// Hàm cập nhật bảng sinh viên
function updateStudentTable() {
    // Xóa dữ liệu cũ
    studentTableBody.innerHTML = '';

    // Thêm từng sinh viên vào bảng
    students.forEach(student => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.class}</td>
            <td>${student.major}</td>
            <td>${student.gpa}</td>
            <td>
                <button onclick="editStudent('${student.id}')">Sửa</button>
                <button onclick="deleteStudent('${student.id}')">Xóa</button>
            </td>
        `;

        studentTableBody.appendChild(row);
    });
}

// Hàm xóa sinh viên
function deleteStudent(studentId) {
    students = students.filter(student => student.id !== studentId);
    updateStudentTable();
}

// Hàm sửa sinh viên
function editStudent(studentId) {
    const student = students.find(student => student.id === studentId);

    if (student) {
        document.getElementById('studentId').value = student.id;
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentAge').value = student.age;
        document.getElementById('studentClass').value = student.class;
        document.getElementById('studentMajor').value = student.major;
        document.getElementById('studentGpa').value = student.gpa;

        // Focus vào input đầu tiên để người dùng chỉnh sửa
        document.getElementById('studentId').focus();
    }
}

// Tìm kiếm sinh viên
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();

    // Lọc danh sách sinh viên theo tên hoặc mã sinh viên
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm) || student.id.toLowerCase().includes(searchTerm)
    );

    // Cập nhật bảng với kết quả tìm kiếm
    studentTableBody.innerHTML = '';

    filteredStudents.forEach(student => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.class}</td>
            <td>${student.major}</td>
            <td>${student.gpa}</td>
            <td>
                <button onclick="editStudent('${student.id}')">Sửa</button>
                <button onclick="deleteStudent('${student.id}')">Xóa</button>
            </td>
        `;

        studentTableBody.appendChild(row);
    });
});
