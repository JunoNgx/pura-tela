<div class="studio">
    <div class="studio__canvas-container">
        <canvas id="preview-canvas"></canvas>
    </div>
    <div class="studio__control">
        <div class="studio__colour">
            <div class="studio__hex-code">
                <div class="studio__hex-code-input">
                    <label for="hexCode">#</label>
                    <input
                        name="hexCode"
                        type="text"
                        minlength="3"
                        maxlength="6"
                    />
                </div>
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
            <h3>
                <label for="size">Dimensions</label>
            </h3>
            <select>
                <option>mobile</option>
                <option>desktop</option>
                <option>square</option>
            </select>
        </div>
        <div class="studio__buttons">
            <button>download</button>
            <button>save colour to gallery</button>
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

    .studio__hex-code {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .studio__rgb {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
</style>
