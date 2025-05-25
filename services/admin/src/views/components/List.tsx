function List<
    T extends { id: number; created_at: string; updated_at: string } & Record<
        string,
        string | number | boolean
    >
>({ data, title }: { data: T[] | null; title: string }) {
    return (
        <div class="container">
            <h1>{title}</h1>
            {!data || data.length === 0 ? (
                <div>Error</div>
            ) : (
                <ul class="items-list" id="items-list">
                    <li class="item">
                        <div class="item-contents">
                            {data[0] &&
                                Object.keys(data[0]).map((key) => (
                                    <p class="item-child bold capitalize">
                                        {key}
                                    </p>
                                ))}
                        </div>
                    </li>

                    {data.map((item) => (
                        <li class="item">
                            <div class="item-contents">
                                {Object.entries(item).map(([key, val]) => (
                                    <p
                                        class="item-child"
                                        id={`${key}-${item.id}`}
                                    >
                                        {typeof val === "string" &&
                                        !isNaN(new Date(val).getTime())
                                            ? new Date(val).toUTCString()
                                            : val}
                                    </p>
                                ))}
                            </div>

                            <div class="item-btn-container">
                                <button class="btn" id={`edit-${item.id}`}>
                                    ✏️ Edit
                                </button>
                                <button
                                    class="btn secondary"
                                    id={`delete-${item.id}`}
                                >
                                    ❌
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default List;
