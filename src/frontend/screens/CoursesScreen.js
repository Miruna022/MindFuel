import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, Button, Alert } from "react-native";
import CourseFolder from "../components/CourseFolder";

const CoursesScreen = () => {
    const [courseData, setCourseData] = useState([
        { title: "Math 101", color: "#e27c7c" },
        { title: "History 201", color: "#e2b97c" },
        { title: "Science 301", color: "#ade27c" },
        { title: "Literature 401", color: "#7c9ce2" },
        { title: "Art 501", color: "#bd7ce2" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [courseName, setCourseName] = useState("");
    const [courseColor, setCourseColor] = useState("#C3B1E1"); // default color for new courses

    // Add new course handler
    const handleAddCourse = () => {
        if (courseName.trim() === "") {
            Alert.alert("Error", "Course name cannot be empty!");
            return;
        }
        if (!/^#[0-9A-F]{6}$/i.test(courseColor)) {
            Alert.alert("Error", "Please provide a valid hex color code!");
            return;
        }
        setCourseData((prevCourses) => [
            ...prevCourses,
            { title: courseName, color: courseColor },
        ]);
        setCourseName("");
        setShowModal(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Courses</Text>

            {/* Course Folders */}
            <View style={styles.folderContainer}>
                {courseData.map((course, index) => (
                    <CourseFolder
                        key={index}
                        title={course.title}
                        color={course.color}
                        onPress={() => console.log(`${course.title} folder pressed`)}
                    />
                ))}
            </View>

            {/* Add New Course Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowModal(true)} // Open modal to add new course
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>

            {/* Modal for adding new course */}
            <Modal visible={showModal} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>Add New Course</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Course Name"
                            value={courseName}
                            onChangeText={setCourseName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Course Color (Hex Code)"
                            value={courseColor}
                            onChangeText={setCourseColor}
                        />
                        <TouchableOpacity style={styles.addCourseButton} onPress={handleAddCourse}>
                            <Text style={styles.addButtonText}>Add Course</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setShowModal(false)}
                        >
                            <Text style={styles.addButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start", // align items from the top
        padding: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 40,
        marginBottom: 20,
        marginVertical: 10,
    },
    folderContainer: {
        flexDirection: "row",
        flexWrap: "wrap", // allow items to go to the next line
        justifyContent: "flex-start", // align folders from left to right
        width: "90%",
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: "#D3D3D3", // Light gray to resemble folder
        borderRadius: 10,
        width: 90,
        height: 90,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 20,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 1, // Adding a border to the modal
        borderColor: "#ccc", // Light border color
    },
    modalHeader: {
        fontSize: 23,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#ccc",
    },
    addCourseButton: {
        backgroundColor: "#BD7CE2", // New button color (purple)
        borderRadius: 13, // Rounded corners
        padding: 5,
        width: "80%",
        alignItems: "center",
        marginVertical: 10,
    },
    cancelButton: {
        backgroundColor: "#E27C7C", // New button color (red)
        borderRadius: 13, // Rounded corners
        padding: 4,
        width: "60%",
        alignItems: "center",
    },
});

export default CoursesScreen;
