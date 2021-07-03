function AdminCard({ title, entitiesArray }) {
    return (
        <>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{title}</h5>
                    <ul>
                        {entitiesArray.map(entity => {
                            <li><a href={entity.link}>{entity.name}</a></li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AdminCard