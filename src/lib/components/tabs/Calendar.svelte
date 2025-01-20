<script lang="ts">
    let courses = [
        { title: 'Anglais', date: '2025-01-22', time: '14:00', location: 'Chez le formateur' }
    ];

    const editCourse = (course) => {
        alert(`Modifier le cours : ${course.title}`);
    };

    const deleteCourse = (course) => {
        if (confirm(`Supprimer le cours : ${course.title} ?`)) {
            alert('Cours supprimé.');
        }
    };
</script>

<div>
    <h2>Calendrier</h2>
    <ul>
        {#each courses as course}
            <li>
                <strong>{course.title}</strong> - {course.date} à {course.time} ({course.location})
                <button on:click={() => editCourse(course)}>Modifier</button>
                <button on:click={() => deleteCourse(course)}>Supprimer</button>
            </li>
        {/each}
    </ul>
</div>
