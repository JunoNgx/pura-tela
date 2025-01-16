<div class="studio">
    <div class="studio__canvas-container">
        <canvas id="preview-canvas"></canvas>
    </div>
    <div class="studio__control">
        <div class="studio__colour">
            <div class="studio__hex-code">
                <label for="hexCode">#</label>
                <input
                    name="hexCode"
                    type="text"
                    minlength="3"
                    maxlength="6"
                />
                <button>pick</button>
                <button>choose</button>
                <button>randomise</button>
            </div>
            <div class="studio__rgb">
                <div class="studio__rgb-item">
                    <label for="red">R</label>
                    <input
                        name="red"
                        type="number"
                        min="0"
                        max="255"
                    />
                </div>
                <div class="studio__rgb-item">
                    <label for="green">G</label>
                    <input
                        name="red"
                        type="number"
                        min="0"
                        max="255"
                    />
                </div>
                <div class="studio__rgb-item">
                    <label for="blue">B</label>
                    <input
                        name="blue"
                        type="number"
                        min="0"
                        max="255"
                    />
                </div>
            </div>

        </div>
        <div class="studio__size">

        </div>
        <div class="studio__buttons">

        </div>
    </div>
</div>

<style>
    .studio {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .studio__canvas-container {
        flex-grow: 1;
        background-color: aqua;
    }

    .studio__control {
        flex-grow: 1;
    }

    .studio__colour {

    }
</style>
