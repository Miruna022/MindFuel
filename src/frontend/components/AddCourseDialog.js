import {Modal, TouchableOpacity, Text, View, StyleSheet} from 'react-native'
import {ColourCircle} from "./ColourCircle";
import {InputField} from "./InputField";

const colours = ['#E1B1B1', '#E1C8B1', '#E1DBB1', '#CCE1B1', '#B1E1B4',
                         '#B1E1D3', '#B1D3E1', '#B1BCE1', '#C8B1E1', '#E1B1DF']

export const AddCourseDialog = () => {
    return (
        <Modal
            animationType={'slide'}
            transparent={true}
            styles={styles.modal}
        >
            <View style={styles.modalContainer}>
                <Text style={styles.title}>Add a new course</Text>
                <InputField
                    style={styles.inputField}
                    fieldName={"Enter the course name"}
                    placeholder={"e.g. Math 101"}
                />
                <View style={styles.colourCircles} >
                    {colours.map((color, index) => (
                        <ColourCircle
                            key={index}
                            color={color}
                        />
                    ))}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
    },

    modalContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        // verticalAlign: 'center',
        // marginHorizontal: 28,
        height: '50%',
        maxWidth: '90%',
        borderRadius: 40,
        borderWidth: 2,
    },

    title: {
        fontFamily: 'Inter-ExtraBold',
        fontSize: 24,
        flex: 2/6,
        marginBottom: -70
    },

    colourCircles: {
        marginTop: -30,
        width: 200,
        maxWidth: 280,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',

    },

    inputField: {
        flex: 3/8,
        width: 280,
    }
})