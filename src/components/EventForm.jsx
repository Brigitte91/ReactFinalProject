/*eslint-disable*/
import { useState, useContext } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Checkbox,
    Flex,
    useToast,
    Button,
    Select
} from "@chakra-ui/react";
import { CategoryContext } from "./CategoryContext";
import { UserContext } from "./UserContext"


export const EventForm = ({ initialValues, onClose }) => {
    const { categories } = useContext(CategoryContext);
    const { users } = useContext(UserContext);
    const [formData, setFormData] = useState(initialValues);
    const [user, setUser] = useState(initialValues.createdBy);
    const [checkedItems, setCheckedItems] = useState(initialValues.categoryIds || []);
    const toast = useToast()
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            let newEventId = null;
            let response;

            if (!formData.id) {
                const existingEventsResponse = await fetch('http://localhost:3000/events');
                const existingEventsData = await existingEventsResponse.json();

                const highestEventId = Math.max(...existingEventsData.map(event => event.id));
                newEventId = parseInt(highestEventId + 1);
            }

            const selectedCategories = checkedItems.map(categoryId => parseInt(categoryId));
            formData.categoryIds = selectedCategories;
            formData.createdBy = user;

            if (newEventId !== null) {
                formData.id = newEventId;

                response = await fetch('http://localhost:3000/events', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)

                });


            } else {

                response = await fetch('http://localhost:3000/events', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });


            }



            if (response.ok) {

                if (newEventId) {
                    toast({
                        title: 'Event created.',
                        description: "Your event has been created!",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);

                } else {
                    toast({
                        title: 'Event updated.',
                        description: "The event was successfully updated",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    });
                }
                console.log('form data submitted successfully: ', formData);
                onClose();
            }
        } catch (error) {
            console.error('Error submitting data', error);
        }
    };

    const handleUserChange = (e) => {
        setUser(e.target.value)
        console.log(user)
    }



    const handleCategoryChange = (categoryId, isChecked) => {
        if (isChecked) {
            setCheckedItems(prevCheckedItems => [...prevCheckedItems, categoryId]);
        } else {
            setCheckedItems(prevCheckedItems => prevCheckedItems.filter(id => id !== categoryId));
        }
    };

    const isCategoryChecked = categoryId => checkedItems.includes(categoryId);

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input name="title" value={formData.title} onChange={handleChange} />
            </FormControl>

            <FormControl id="image" isRequired>
                <FormLabel>Image Url</FormLabel>
                <Input name="image" value={formData.image} onChange={handleChange} />
            </FormControl>

            <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl id="location" isRequired>
                <FormLabel>Location</FormLabel>
                <Input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl id="startTime" isRequired>
                <FormLabel>Start Time</FormLabel>
                <Input
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl id="endTime" isRequired>
                <FormLabel>End Time</FormLabel>
                <Input
                    type="datetime-local"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl id="createdBy" isRequired>
                <FormLabel>Created By</FormLabel>
                <Select value={user} onChange={handleUserChange}>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>))
                    }
                </Select>
            </FormControl>

            <FormControl id="categoryIds" isRequired={checkedItems.length === 0}>
                <FormLabel>Categories</FormLabel>
                <Flex flexdir={['column', 'row']} gap={2}>
                    {categories.map((category) => (
                        <Checkbox
                            key={category.id}
                            value={category.id}
                            isChecked={isCategoryChecked(category.id)}
                            onChange={(e) => handleCategoryChange(category.id, e.target.checked)}>
                            {category.name}
                        </Checkbox>
                    ))}
                </Flex>

            </FormControl>
            <Flex flexdir={['column', 'row']} gap={2} mt={2}>
                <Button type='submit'>Submit</Button>
                <Button onClick={onClose} variant={"ghost"}>Cancel</Button>
            </Flex>
        </Box>
    );
};